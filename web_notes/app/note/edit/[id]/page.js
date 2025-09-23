import NoteEditor from '@/components/NoteEditor'
export default async function EditPage({ params }) {
    return (
        <NoteEditor note = {null} initialTitle = "Untitled" initialBody = ""/>
    )
}