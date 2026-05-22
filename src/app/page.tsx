import { redirect } from 'next/navigation';

export default function RootPage() {
    // Redirige a todos los usuarios que entren a la raíz hacia la versión en español
    redirect('/es');
}