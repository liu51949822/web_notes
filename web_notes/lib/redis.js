import Redis from "ioredis";

// 获取环境变量配置
const REDIS_CONNECT_TIMEOUT = parseInt(process.env.REDIS_CONNECT_TIMEOUT || '5000');
const ENABLE_REDIS_RETRY = process.env.REDIS_RETRY_STRATEGY !== 'false';

// 创建Redis客户端并配置错误处理
const redis = new Redis({
  host: "47.101.158.217",
  port: 16379,
  password: "", // 如果需要认证
  connectTimeout: REDIS_CONNECT_TIMEOUT,
  // 配置重连策略
  retryStrategy: function(times) {
    if (!ENABLE_REDIS_RETRY) {
      return null; // 不重试，直接断开连接
    }
    // 计算重连延迟，最大为5秒
    const delay = Math.min(times * 100, 5000);
    console.log(`Redis连接失败，${delay}ms后尝试重连...`);
    return delay;
  },
  // 配置最大重连次数
  maxRetriesPerRequest: 3,
  // 启用离线队列（当连接断开时，命令会排队等待重连后执行）
  enableOfflineQueue: true
});

// 监听Redis连接错误
redis.on('error', (err) => {
  console.error('Redis连接错误:', err.message);
  // 记录错误但不抛出异常，避免应用崩溃
});

// 监听Redis连接成功
redis.on('connect', () => {
  console.log('成功连接到Redis服务器');
});

// 监听Redis重连事件
redis.on('reconnecting', (info) => {
  console.log(`Redis正在重连... 尝试次数: ${info.attempt}`);
});

// 监听Redis断开连接
redis.on('end', () => {
  console.log('Redis连接已断开');
});
const initialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

export async function getAllNotes() {
    console.log('getAllNotes66666')
     const data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes")
}

export async function addNote(data) {
  console.log('addNote', data)
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid
}

export async function updateNote(uuid, data) {
  console.log('updateNote', uuid, data)
  await redis.hset("notes", [uuid], data);
}

export async function delNote(id) {
    console.log('deleteNote')
    await redis.hdel("notes", [id]);
}

export async function getNote(id) {
    console.log('getNote')
    const note = await redis.hget("notes", id);
    return note
}

export default redis;