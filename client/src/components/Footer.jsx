import React from 'react'
import { Footer, FooterDivider } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-emerald-600'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:white'>
                        SurfCirlce
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <Footer.Title title='Forecasts'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.goodsurfnow.co.nz/' target='_blank' rel='noopener noreferrer'>
                                GOODSURFNOW
                            </Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.surfline.com/' rel='noopener noreferrer'>
                                Surfline
                            </Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.surf-forecast.com/' rel='noopener noreferrer'>
                                surfforecast.com
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow me'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://github.com/byronmccormick' target='_blank' rel='noopener noreferrer'>
                                Github
                            </Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.instagram.com/byronmccormick/' target='_blank' rel='noopener noreferrer'>
                                Instagram
                            </Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://www.linkedin.com/in/byronmccormick' target='_blank' rel='noopener noreferrer'>
                                LinkedIn
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='#' rel='noopener noreferrer'>
                                Privacy Policy
                            </Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col>
                            <Footer.Link href='#' rel='noopener noreferrer'>
                                Terms &amp; Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <FooterDivider/>
            <div>
                <Footer.Copyright href='#' by="SurfCirlce" year={new Date().getFullYear()}/>
            </div>
        </div>
    </Footer>
  )
}
