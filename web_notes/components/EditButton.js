import Link from "next/link";

export default function EditButton({ noteId ,children}) {
    const isDraft = noteId == null
    return (
   <Link href={`/note/edit/${noteId || ''}`} className="link--unstyled">
            <button
            className={["button--edit",
                isDraft && "button--edit--draft"?'edit-botton--solid'
                :'edit-botton--outline',
            ].join('')
        }
        role="menuitem">
            {children}
        </button>
        </Link>
    )
}