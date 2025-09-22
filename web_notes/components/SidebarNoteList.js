import SidebarNoteItem from '@/components/SidebarNoteItem';
import { getAllNotes } from '@/lib/redis';


export default async function SidebarNoteList() {
  // 获取笔记数据
  const notes = await getAllNotes() || {};

  const arr = Object.entries(notes);

  if (arr.length === 0) {
    return <div className="notes-empty">
      {'No notes created yet!'}
    </div>
  }

  return <ul className="notes-list">
    {arr.map(([noteId, note]) => (
      <li key={noteId}>
        <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
      </li>
    ))}
  </ul>
}