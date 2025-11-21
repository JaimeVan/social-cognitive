#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL and Neo4j to be ready..."
sleep 10

echo "🚀 Initializing PostgreSQL schema..."
PGPASSWORD=postgres123 psql -h postgres -U postgres -d social_cognitive_db -f /init/init_postgres.sql

echo "🚀 Initializing Neo4j base graph..."
cypher-shell -a bolt://neo4j:7687 -u neo4j -p test123 -f /init/init_neo4j.cypher

echo "✅ Initialization completed!"
