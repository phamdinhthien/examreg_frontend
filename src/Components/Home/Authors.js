import React, { Component } from 'react';
import author1 from './images/author1.jpg';
import author3 from './images/author3.jpg';
import author2 from './images/author2.jpg';
class Author extends Component {

    render() {
        return (
            // Các tác giả
            <div className="container-author">
                <h1 style={{textAlign:"center", marginTop:"2px"}}>Thiết Kế Chương Trình</h1>
                <div className="boxAuthor">
                    <div className="author">
                        <div className="authorImg">
                            <img src={author1}></img>
                        </div>
                        <div className="details">
                            <h2>Lê Đình Thiện</h2>
                            <p>This text is styled with some of the text formatting properties.
                               The heading uses the text-align, text-transform, and color properties.
                               The paragraph is indented, aligned, and the space between characters is specified.
                               The underline is removed from this colored <br></br>
                               "Try it Yourself" link.</p>
                        </div>

                    </div>
                    <div className="author">
                        <div className="authorImg">
                            <img src={author2}></img>

                        </div>
                        <div className="details">
                            <h2>Nguyễn Trọng Hoàng</h2>
                            <p>This text is styled with some of the text formatting properties.
                               The heading uses the text-align, text-transform, and color properties.
                               The paragraph is indented, aligned, and the space between characters is specified.
                               The underline is removed from this colored <br></br>
                               "Try it Yourself" link.</p>
                        </div>

                    </div>
                    <div className="author">
                        <div className="authorImg">
                            <img src={author3}></img>

                        </div>
                        <div className="details">
                            <h2>Nguyễn Chí Thành</h2>
                            <p>This text is styled with some of the text formatting properties.
                               The heading uses the text-align, text-transform, and color properties.
                               The paragraph is indented, aligned, and the space between characters is specified.
                               The underline is removed from this colored<br></br> 
                               "Try it Yourself" link.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Author;