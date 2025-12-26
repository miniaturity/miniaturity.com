import { Link } from 'react-router-dom';
import '../styles/Main.css';
import Background from '../components/Background';

const Main: React.FC = () => {


  return (
    <>
      <Background 
        color={{
          hover: "#ff0000",
          idle: "#ffeded",
          active: "#ff0000",
          outline: "rgba(255, 159, 159, 0.2)",
          hoverOutline: "rgba(255, 0, 0, 1)"
        }}
        hoverScale={1.05}
        hoverField={0}
        squareSize={30}
      />
    
    <div className="main">
      <UpperCard />
      <CenterCard />
    </div>
    </>
  )
}

// #region cards

const CenterCard: React.FC = () => {

  return (
    <main>
      <div className="h_label" style={{ width: "30%" }}>
        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'>
          <line x1='0' y1='0' x2='100' y2='100' stroke='#ff0000' vectorEffect='non-scaling-stroke' strokeWidth='2'/>
          <line x1='0' y1='100' x2='100' y2='0' stroke='#ff0000' vectorEffect='non-scaling-stroke' strokeWidth='2'/>
        </svg>
      </div>

      <header>
        <div className="h_title">
          <div>Miniaturity</div>
        </div>

        <div className="h_main">
          
          <div className="hm_left">
            <div style={{ margin: "var(--margin)", height: "50%"}}>
              rayhan
              <br />new york city
              <br />indonesian-american
            </div>
            <div style={{ flexGrow: 1 }}></div>
            <div className="hml_letter">
              A
            </div>
          </div>

          <div className="hm_right">

            <div className="hmr_top">
              <span style={{ textAlign: "justify", textAlignLast: "justify", fontWeight: "bold" }}>
                AN_OVERVIEW AAA
              </span>
              ui/ux designer
              <br />front-end dev
              <div style={{ flexGrow: 1 }}></div>
              <div style={{ textAlign: "justify", textAlignLast: "justify", fontWeight: "bold"}}>
                react typescript svelte scss
              </div>
            </div>
            <div className='seperator-w' style={{ margin: "0 var(--margin) clamp(4px, 5vw, 12px) var(--margin)", width: "calc(100% - var(--margin) * 2)" }}></div>
            <div className="hmr_bottom">
              <div className="hmrr_barcode">
                <img alt="" src="/assets/images/barcodered.png"/>
              </div>
              <div style={{ flexGrow: 1 }}></div>
              <div style={{ width: "100%", height: "20%", background: "var(--c-main)"}}>

              </div>
            </div>

          </div>

        </div>
      </header>
    </main>
  );
}

const UpperCard: React.FC = () => {

  return (
    <div className="upper_card">
      <div className="uc_left">
        <div className="u_header">
          <div>MINIATURITY</div>
          <div>DIRECTORY.VIEW</div>
        </div>

        <div className="u_main">
          <div className="um_top">
            <div className="umt_left">
              <Link to="/projects">projects&nbsp;&nbsp;{'→'}</Link>
              <Link to="/about">about&nbsp;&nbsp;{'→'}</Link>
              <Link to="/links">links&nbsp;&nbsp;{'→'}</Link>
            </div>
            <div className="umt_right">
              <div className="umtr_label">
                LOT: A_6645
                <br /> SECT: A_021
                <br /> ROW: 17
                <br /> SEAT: 08
                <br /> TYPE: STANDARD
              </div>
            </div>
          </div>

          <div className="um_bottom">
            <img alt="" src="/assets/images/barcodered.png" />
          </div>
        </div>
      </div>
      <div className="uc_right">
        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'>
          <line x1='0' y1='0' x2='100' y2='100' stroke='#ff0000' vectorEffect='non-scaling-stroke' strokeWidth='2'/>
          <line x1='0' y1='100' x2='100' y2='0' stroke='#ff0000' vectorEffect='non-scaling-stroke' strokeWidth='2'/>
        </svg>
      </div>
    </div>
  )
}

// #endregion


export default Main;