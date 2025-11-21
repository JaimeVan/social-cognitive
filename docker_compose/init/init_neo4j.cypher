// ================================
// Neo4j Initialization Script
// ================================

// 清理现有测试数据（可选）
MATCH (n) DETACH DELETE n;

// 创建全局约束与索引
CREATE CONSTRAINT user_id_unique IF NOT EXISTS
FOR (u:User)
REQUIRE u.id IS UNIQUE;

CREATE INDEX IF NOT EXISTS FOR (u:User) ON (u.label);
CREATE INDEX IF NOT EXISTS FOR (p:Post) ON (p.id);

// 定义通用属性结构
// User 节点: id, label, community_id, role, influence
// Post 节点: id, text, timestamp, sentiment, topic_id
// 边 INTERACT/REPOST/REPLY 属性: weight, s_sem, s_tmp, w_inter

// 示例：创建一个测试热点的子图
CREATE (u1:User {id: 1, label: "Alice", community_id: 1})
CREATE (u2:User {id: 2, label: "Bob", community_id: 1})
CREATE (u3:User {id: 3, label: "Carol", community_id: 2})
CREATE (u1)-[:INTERACT {weight: 0.6, s_sem: 0.1, s_tmp: 0.0, w_inter: 0.5}]->(u2)
CREATE (u2)-[:INTERACT {weight: 0.4, s_sem: 0.2, s_tmp: 0.1, w_inter: 0.2}]->(u3);
