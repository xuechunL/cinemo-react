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
    <div className={styles.movieCard}>
      <div className={styles.movieCard__image}>
        <Image
          src={image}
          alt={title}
          width={300}
          height={180}
          objectFit="cover"
        />
      </div>

      <div className={styles.movieCard__content}>
        <h3 className={styles.movieCard__title}>{title}</h3>
        <p className={styles.movieCard__description}>{description}</p>

        <div className={styles.movieCard__rating}>
          <span className={styles.movieCard__ratingIcon}>★</span>
          <span className={styles.movieCard__ratingValue}>
            {rating.toFixed(1)}
          </span>
        </div>

        <div className={styles.movieCard__actions}>
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
