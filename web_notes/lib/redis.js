import Redis from "ioredis";

const Redis = new Redis();
const initialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

export async function getAllNotes() {
    const notes = await Redis.hgetall('notes')
    if(notes.length === 0) {
        await Redis.hmset('notes', initialData)
    }
    return notes;
}

export async function addNote(note) {
    const id = Date.now().toString()
    await redis.hset("notes", [uuid], data);
  return uuid
}

export async function editingNote(id, note) {
    await redis.hset("notes", [id], note);
}

export async function deleteNote(id) {
    await redis.hdel("notes", [id]);
}

export async function getNote(id) {
    const note = await redis.hget("notes", [id]);
  return note
}   

export default Redis;