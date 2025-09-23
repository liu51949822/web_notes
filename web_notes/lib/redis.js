import Redis from "ioredis";

const redis = new Redis(
    {
  host: "47.101.158.217",
  port: 16379,
  password: "" // 如果需要认证
}
);
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