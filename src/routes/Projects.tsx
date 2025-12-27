import { Cube } from '../components/Cube';
import '../styles/Projects.css';

const ProjectCards: ProjectCardProps[] = [
  {
    name: "Womble",
    desc: "A web-based game inspired by wordle. Uses typescript and react, completely frontend served on Vercel.",
    year: "11/2025",
    link: "https://womble.miniaturity.com",
  },
  {
    name: "Hack-A-Garden",
    desc: "A web-based app where users can design their own garden, using their hours coding and the languages they code. Built in react, typescript and Node.js with express backend to manage Slack OAuth.",
    year: "[UNRELEASED]",
    link: "https://miniaturity.com",
  },
  

];

export const Projects: React.FC = () => {


  return (
    <div className="projects">
      <div className="left">
        <Cube />
      </div>

      <div className="right">
        {ProjectCards.map((p, i) => (
          <ProjectCard 
            key={i}
            name={p.name}
            desc={p.desc}
            year={p.year}
            link={p.link}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  name: string;
  desc: string;
  year: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = (p) => {
  const {
    name,
    desc,
    link,
    year
  } = p;

  return (
    <div className="project_card">
      <header>
        <div className="pch_name">{name}</div>
        <div className="pch_decor">
          SSS
        </div>
      </header>
      <div className="pc_main">

        <div className="pcm_left">
          <div className="pcml_year">
            <div className="pcmly_a">{year}</div>
            <div className="pcmly_b">MONTH/YEAR</div>
          </div>
          <div className="pcml_desc">
            {desc}
          </div>
        </div>

        <div className="pcm_right">
          <img src="/assets/images/barcodered2.png" alt="" />
          <a target="_blank" rel="noreferrer" href={link}>
            to-project&nbsp;&nbsp;{'→'}
          </a>
        </div>
      </div>
    </div>
  )
}



export default Projects;