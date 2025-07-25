interface TitleProps {
  title: string
  description?: string
}

const Title = ({ ...props }: TitleProps) => {
  return (
    <div className="title-block">
      <h2 className="title-block__title">{props.title}</h2>
      <p className="title-block__description">{props.description && props.description}</p>
    </div>
  )
}

export default Title
