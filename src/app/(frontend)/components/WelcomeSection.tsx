import { IHeroSection } from '@/payload-types'
import WelcomeImage from './welcome/WelcomeImage'
import WelcomeContent from './welcome/WelcomeContent'

interface WelcomeSectionProps {
  data?: IHeroSection
  productTypes: {
    id: string
    name: string
  }[]
}

const WelcomeSection = async ({ ...props }: WelcomeSectionProps) => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__wrapper">
          {props.data && (
            <>
              <WelcomeContent data={props.data} productTypes={props.productTypes} />
              <WelcomeImage mainImage={props.data.mainImage} title={props.data.title} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
