import NoteEditor from '@/components/NoteEditor'
import {getNote} from '@/lib/redis';

export default async function EditPage({ params }) {
  const { id } = await params;
  const noteId = id;
  
  const note = await getNote(noteId)

  // 让效果更明显
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  await sleep(5000);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }
  
  // 需要解析JSON字符串
  const parsedNote = JSON.parse(note);

  return <NoteEditor noteId={noteId} initialTitle={parsedNote.title} initialBody={parsedNote.content} />
}