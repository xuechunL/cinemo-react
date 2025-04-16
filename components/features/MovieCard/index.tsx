import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'

interface MovieCardProps {
  id: string
  title: string
  image: string
  description: string
  rating: number
  onLike?: () => void
  onAddToCollection?: () => void
}

export const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  image,
  description,
  rating,
  onLike,
  onAddToCollection,
}) => {
  console.log(id)
  return (
    // TODO: Use clsx for handling multiple class names in components
    <div className={`${styles.movieCard} flex flex-col card`}>
      <div className="w-full h-48 object-cover rounded-t-lg">
        <Image
          src={image}
          alt={title}
          width={300}
          height={180}
          objectFit="cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mt-2 mb-1">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>

        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="text-gray-600 ml-1">{rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center">
          <button onClick={onLike} className="btn-primary">
            Like
          </button>
          <button onClick={onAddToCollection} className="btn-secondary">
            Add to Collection
          </button>
        </div>
      </div>
    </div>
  )
}
