import Note from '@/components/Note'
import {getNote} from '@/lib/redis';

export default async function Page({ params }) {
  // 动态路由 获取笔记 id - Next.js 15要求params需要await
  const { id } = await params;
  const noteId = id;
  console.log('noteId', noteId);
  const note = await getNote(noteId);

  // // 为了让 Suspense 的效果更明显（实际应用中应移除）
  // const sleep = ms => new Promise(r => setTimeout(r, ms));
  // await sleep(5000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          向左看齐 🥺
        </span>
      </div>
    )
  }

  return <Note noteId={noteId} note={JSON.parse(note)} />
}
