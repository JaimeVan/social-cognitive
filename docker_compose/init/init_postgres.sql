-- ================================
-- PostgreSQL Initialization Script
-- ================================

-- 1. 创建 Schema
CREATE SCHEMA IF NOT EXISTS topic_meta;
CREATE SCHEMA IF NOT EXISTS topic_analysis;
CREATE SCHEMA IF NOT EXISTS topic_group;

-- =========================================
-- topic_meta: 热点任务与元信息
-- =========================================
CREATE TABLE IF NOT EXISTS topic_meta.topic_info (
    topic_id BIGSERIAL PRIMARY KEY,
    topic_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    task_status VARCHAR(50) DEFAULT 'pending',   -- pending / processing / done / failed
    source_tag VARCHAR(50),
    priority INT DEFAULT 5,
    neo4j_graph_name VARCHAR(100)                -- 对应 Neo4j 图名称
);

CREATE INDEX IF NOT EXISTS idx_topic_status_priority 
    ON topic_meta.topic_info (task_status, priority);

-- =========================================
-- topic_analysis: 热点流行度时序数据
-- =========================================
CREATE TABLE IF NOT EXISTS topic_analysis.topic_timeseries (
    id BIGSERIAL,
    topic_id BIGINT NOT NULL,
    hour_range TIMESTAMPTZ NOT NULL,
    post_count INT,
    like_count INT,
    visit_count INT,
    collection_count INT,
    reply_count INT,
    repost_count INT,
    attitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (topic_id, hour_range)
) PARTITION BY HASH (topic_id);

-- 创建 8 个分区
DO $$
BEGIN
  FOR i IN 0..7 LOOP
    EXECUTE format('
      CREATE TABLE IF NOT EXISTS topic_analysis.topic_timeseries_p%s
      PARTITION OF topic_analysis.topic_timeseries
      FOR VALUES WITH (modulus 8, remainder %s);
    ', i, i);
  END LOOP;
END $$;
$$;

CREATE INDEX IF NOT EXISTS idx_timeseries_hour 
  ON topic_analysis.topic_timeseries (topic_id, hour_range DESC);

-- =========================================
-- topic_group: 关键群体与画像
-- =========================================

-- 群体信息表
CREATE TABLE IF NOT EXISTS topic_group.group_info (
    group_id BIGSERIAL PRIMARY KEY,
    topic_id BIGINT NOT NULL,
    group_name VARCHAR(100),
    neo4j_graph_name VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_group_topic 
  ON topic_group.group_info (topic_id);

-- 群体关键词
CREATE TABLE IF NOT EXISTS topic_group.group_keywords (
    id BIGSERIAL PRIMARY KEY,
    group_id BIGINT NOT NULL REFERENCES topic_group.group_info(group_id) ON DELETE CASCADE,
    keywords JSONB NOT NULL,   -- [{"term":"market","weight":8.4}, ...]
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 群体话题占比
CREATE TABLE IF NOT EXISTS topic_group.group_topics (
    id BIGSERIAL PRIMARY KEY,
    group_id BIGINT NOT NULL REFERENCES topic_group.group_info(group_id) ON DELETE CASCADE,
    topic_share JSONB NOT NULL,  -- [{"label":"xxx","share":0.21,...}]
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 完成
COMMENT ON SCHEMA topic_meta IS '热点任务与元信息';
COMMENT ON SCHEMA topic_analysis IS '热点流行度时序数据';
COMMENT ON SCHEMA topic_group IS '关键群体画像与关键词';
