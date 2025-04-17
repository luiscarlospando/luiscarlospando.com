import React from "react";
import { createRoot } from "react-dom/client";

function LiveAlert() {
    return (
        <div className="row">
            <div className="col-12 col-md-10 offset-md-1">
                <div
                    id="mijostreams-livestream-alert"
                    className="card text-center mt-3"
                >
                    <div className="card-body rounded">
                        <p>
                            <i
                                id="live-icon"
                                className="fa-solid fa-circle animated live infinite"
                            ></i>
                            ¡Estoy{" "}
                            <a href="https://luiscarlospando.com/live/">
                                en vivo
                            </a>
                            !
                        </p>
                    </div>
                </div>

                <div
                    id="m7gp-livestream-alert"
                    className="card text-center mt-3"
                >
                    <div className="card-body rounded">
                        <p>
                            <i
                                id="live-icon"
                                className="fa-solid fa-circle animated live infinite"
                            ></i>
                            ¡El{" "}
                            <a href="https://luiscarlospando.com/games/mario-kart/">
                                Mode 7 Grand Prix
                            </a>{" "}
                            está{" "}
                            <a href="https://luiscarlospando.com/live/">
                                en vivo
                            </a>
                            !
                        </p>
                        <p>
                            Código del torneo: <code>0746-6549-8155</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const container = document.querySelector("#live");
const root = createRoot(container);
root.render(<LiveAlert />);
