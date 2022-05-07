import { ActiveLink } from './ActiveLink'

const menuItems = [
  {
      text: 'Home',
      href: '/'
  },
  {
      text: 'About',
      href: '/about'
  },
  {
      text: 'Contact',
      href: '/contact'
  },
  {
      text: 'Pricing',
      href: '/pricing'
  },
];


export const NavBar = () => {
    return (
      <nav>
        {
          menuItems.map( ({ text, href}) => {
              return <ActiveLink key={ href } text={text} href={href} />
          })
        }

        {/* <ActiveLink text="Home" href='/' />
        <ActiveLink text="About" href='/about' />
        <ActiveLink text="Contact" href='/contact' /> */}
      </nav>
    )
}
