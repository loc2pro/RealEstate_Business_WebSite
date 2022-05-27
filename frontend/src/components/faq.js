import React from 'react';
import PageHeader from './global-components/page-header';
import Faq from './section-components/faq-v1';
import Counter from './section-components/counter-v1';
import BlogSlider from './blog-components/blog-slider-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';
import Menu from './global-components/Menu';

const FaqV1 = () => {
    return <div>
        <Menu />
        <PageHeader headertitle="Các câu hỏi thường gặp" subheader="FAQ" />
        <Faq />
        <Counter />
        <BlogSlider sectionClass="pt-120" />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default FaqV1

