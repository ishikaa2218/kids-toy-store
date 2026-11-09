export const mainNav = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?menu=age', label: 'Shop by Age', menu: 'age' as const },
  { href: '/shop?menu=categories', label: 'Categories', menu: 'categories' as const },
  { href: '/about', label: 'Our Story' },
]

export const footerNav = {
  shop: [
    { href: '/shop', label: 'All toys' },
    { href: '/shop?sort=price-asc', label: 'Gifts by price' },
    { href: '/cart', label: 'Your bag' },
  ],
  company: [
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact Us' },
  ],
}
