import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'

interface LessonProps {
  slug: string
  availableAt: Date
  title: string
  lessonType: string
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>()
  const isLessonAvailable = isPast(props.availableAt)
  const availableDateFormat = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR }
  )

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormat}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors ${
          isActiveLesson ? 'bg-green-500' : ''
        }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={`text-sm text-blue-500 font-medium flex items-center gap-2 ${
                isActiveLesson ? 'text-white' : 'text-blue-500'
              }`}
            >
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em Breve
            </span>
          )}
          <span
            className={`text-xs font-bold text-white py-[0.125rem] px-2 border rounded ${
              isActiveLesson ? 'border-white' : 'border-green-300'
            }`}
          >
            {props.lessonType === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <strong
          className={`mt-5 block ${
            isActiveLesson ? 'text-white' : 'text-gray-200'
          }`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  )
}
