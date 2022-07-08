import Head from "next/head";

export default function Home() {
  function closeModal() {
    var modal_id = localStorage.getItem("openModal");
    if (!modal_id) return;

    var modal = document.getElementById(modal_id);
    if (!modal) return;
    if (!modal_id.match("settings")) {
      var modalContent = document.getElementById("modal-content");
      if (!modalContent) return;

      modalContent.innerText = "";
    }
    modal.style.display = "none";
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WHIM experience</title>
        <script
          type="text/javascript"
          src="/scripts/webOSTVjs-1.2.4/webOSTV.js"
          async
        ></script>
        <script
          type="text/javascript"
          src="/scripts/spatial_navigation.js"
          async
        ></script>
        <script
          type="text/javascript"
          src="/scripts/eventListeners.js"
          async
        ></script>
        <script type="text/javascript " src="/scripts/whim.js" async></script>
      </Head>
      <div className="container" id="container">
        <header>
          <div id="header-span"></div>
          <div className="logo">
            <img src="/icons/WHIMLogo.svg" />
          </div>
          <div className="app-settings" id="header">
            <div
              className="item focusable"
              tabIndex={0}
              id="settings-auth"
            ></div>
            <div
              className="item focusable"
              tabIndex={0}
              id="settings-canvas"
            ></div>
          </div>
        </header>
        <div id="main">
          <div id="mainflex">
            <div className="item focusable" tabIndex={0} id="Anderson"></div>
            <div className="item focusable" tabIndex={0} id="F1"></div>
            <div className="item focusable" tabIndex={0} id="Gameday"></div>
            <div className="item focusable" tabIndex={0} id="Reuters"></div>
          </div>
        </div>
      </div>
      <div id="modal" tabIndex={1}>
        {/* <!-- <button id="close-modal" type="item button" tabindex="2" onclick="closeModal('modal')"></button> --> */}
        <div id="modal-content"></div>
      </div>
      <div className="modal" id="auth" tabIndex={-1} role="dialog">
        <form id="auth-form">
          <button
            className="button close-button focusable"
            id="close-auth"
            type="button"
            tabIndex={0}
            onClick={closeModal}
          ></button>
          <img src="/icons/WHIMLogo.svg" />
          <label htmlFor="email">Email</label>
          <input className="focusable" type="email" id="email" />
          <label htmlFor="password">Password</label>
          <input className="focusable" type="password" id="password" />
          <p id="auth-message" style={{ color: "white" }}></p>
          <button className="button focusable" id="auth-submit">
            Login
          </button>
        </form>
      </div>
      <div className="modal" id="canvas" tabIndex={-1} role="dialog">
        <form id="canvas-form" onSubmit={closeModal}>
          <button
            className="button close-button focusable"
            id="close-canvas-id"
            type="button"
            tabIndex={0}
            onClick={closeModal}
          ></button>
          <label htmlFor="canvas-id">Canvas Id</label>
          <input className="focusable" type="text" id="canvas-id" />
          <button
            className="button focusable"
            type="submit"
            id="canvas-settings-submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
