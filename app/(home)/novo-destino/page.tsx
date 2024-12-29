import { FormNovoDestino } from './_components/form-novo-destino'

export default function NovoDestinoPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-10 font-bold text-4xl">Novo Destino</h1>
        <p>Adicione um novo destino à sua coleção de lugares incríveis.</p>
        <FormNovoDestino />
      </main>
    </div>
  )
}
