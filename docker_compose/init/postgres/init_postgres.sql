-- 1. 创建任务表 (analysis_task)
CREATE TABLE analysis_task (
    task_id VARCHAR(50) PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    event_id VARCHAR(50) UNIQUE NOT NULL, -- 事件ID作为后续查询的唯一标识
    event_name VARCHAR(255),
    data_metadata JSONB,
    submit_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    start_time TIMESTAMP WITH TIME ZONE,
    finish_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
    error_info TEXT
);

COMMENT ON TABLE analysis_task IS '社交网络舆论分析任务的元数据和状态';

-- 2. 创建趋势时序表 (trend_timeseries)
CREATE TABLE trend_timeseries (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(50) NOT NULL REFERENCES analysis_task(event_id) ON DELETE CASCADE,
    hour_range TIMESTAMP WITH TIME ZONE NOT NULL,
    post_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    visit_count INTEGER DEFAULT 0,
    collection_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    repost_count INTEGER DEFAULT 0,
    attitude NUMERIC(6,2) DEFAULT 0.0,
    -- 确保在同一事件中，时间点是唯一的
    UNIQUE (event_id, hour_range)
);

CREATE INDEX idx_trend_event_hour ON trend_timeseries (event_id, hour_range);
COMMENT ON TABLE trend_timeseries IS '热点事件的整体流行度演化时间序列数据';

-- 3. 创建群体分析结果表 (group_analysis_result)
CREATE TABLE group_analysis_result (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(50) NOT NULL REFERENCES analysis_task(event_id) ON DELETE CASCADE,
    group_id VARCHAR(50) NOT NULL, -- 群体标识符
    group_name VARCHAR(255),
    keywords_json JSONB, -- 存储关键词柱状图JSON数据
    topics_json JSONB, -- 存储话题占比饼状图JSON数据
    -- 确保在同一事件中，群体是唯一的
    UNIQUE (event_id, group_id)
);

CREATE INDEX idx_group_analysis_event ON group_analysis_result (event_id);
COMMENT ON TABLE group_analysis_result IS '热点事件的关键群体分析结果，包括网络、关键词和话题';