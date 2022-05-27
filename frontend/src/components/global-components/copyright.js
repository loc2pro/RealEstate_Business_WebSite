import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CopyRight extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

        return (
			<div className="ltn__copyright-area ltn__copyright-2 section-bg-7  plr--5">
			<div className="container-fluid ltn__border-top-2">
				<div className="row">
				<div className="col-md-6 col-12">
					<div className="ltn__copyright-design clearfix">
					<p>All Rights Reserved @ Company 2022 PhatLoc<span className="current-year" /></p>
					</div>
				</div>
				<div className="col-md-6 col-12 align-self-center">
					<div className="ltn__copyright-menu text-end">
					<ul className="go-top">
						<li><Link to="/about">Điều khoản &amp; Điều kiện</Link></li>
						<li><Link to="/about">Yêu cầu</Link></li>
						<li><Link to="/about">Riêng tư &amp; Bảo mật</Link></li>
					</ul>
					</div>
				</div>
				</div>
			</div>
			</div>
        )
    }
}


export default CopyRight