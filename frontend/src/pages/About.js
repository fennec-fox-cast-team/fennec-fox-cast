import React from "react";
import {Helmet} from "react-helmet";
import '../resources/styles/App.css'
import '../resources/styles/scroll.css'
import divWithClassName from "react-bootstrap/cjs/utils/divWithClassName";

const About = () => {
    return(
        <div className="scrollbar" id="style-6">
            <Helmet>
                <title>About</title>
            </Helmet>
            <div className="block-content">
                <h3>What is Fennec Fox?</h3>
                Fennec Fox is a streaming platform which allows to communicate via voice or
                video with your friends or find new ones.
                Also Fennc Fox Cast is an open source projects.
                <br/>
                <h3>Technologies</h3>
                <h4>Frontend</h4>
                <ul>
                    <li>React JS for client side. We use React because its well spread technology and we have some minor experience in it.</li>
                    <li>Local storage for saving temporary data.</li>
                    <li>Using WebRTC for peer to peer connection.</li>
                </ul>
                <br/>
                <h4>Backend</h4>
                <ul>
                    <li>Fastify for server side. We use fastify because it is fast and low overhead web framework, for Node.js</li>
                    <li>Using web-socket to connect client to server.</li>
                </ul>
                <br/>
                <h4>Database</h4>
                DBMS MongoDB. We use mongo because we have document oriented data.

                <br/>
                <a href={'https://github.com/fennec-fox-cast-team/fennec-fox-cast'}>Github page</a>
                <br/><br/>
                <div>
                    Authors:
                    <ul>
                        <li>Ivan Horokhovskyi</li>
                        <li>Roman Kriwohizha</li>
                        <li>Dmitry Lykhovsky</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
