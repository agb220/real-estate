import Header from './Header'

const LayoutWrapper = (props: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      {props.children}
      {/* <Footer /> */}
    </>
  )
}

export default LayoutWrapper
