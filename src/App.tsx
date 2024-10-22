import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './TabsComponent.css'
import './App.css';
import projects from './projekte.json';
var projectsArray: Project[] = [];
var financeArray: Finance[] = [];

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Finance {
  id: number;
  name: string;
  category: string;
  date: string;
  teasman: string;
  ammount: number;
  notes: string;
  constructor(id:number, name:string, category:string, date:string, teasman:string, ammount:number, notes:string){
    this.id = id;
    this.name = name;
    this.category = category;
    this.date = date;
    this.teasman = teasman;
    this.ammount = ammount;
    this.notes = notes;
  }
}

class Project {
  id:string;
  name:string;
  projectlead:string;
  description:string;
  modifiedAt:string;
  modifiedBy:string;
  constructor(id:string, name:string, projectlead:string, description:string, modifiedAt:string, modifiedBy:string){
    this.id = id;
    this.name = name;
    this.projectlead = projectlead;
    this.description = description;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
  }
}

function ReadProjects(obj:any[]){
  for(var i = 0; i < obj.length; i++){
    var temp = obj[i];
    var pr_tmp = new Project(temp.id, temp.name, temp.projektleiter, temp.beschreibung, temp.modifiedAt, temp.modifiedBy);
    projectsArray.push(pr_tmp);
  }
}

function findProjectProperty(searchStatement:string, property:string){
  var result;
  switch(property){
    case 'id': result = projectsArray.find((p) => p.id == searchStatement)?.id.toString(); break;
    case 'name': result = projectsArray.find((p) => p.id == searchStatement)?.name.toString(); break;
    case 'lead': result = projectsArray.find((p) => p.id == searchStatement)?.projectlead.toString(); break;
    case 'description': result = projectsArray.find((p) => p.id == searchStatement)?.description.toString(); break;
    case 'modifiedAt': result = projectsArray.find((p) => p.id == searchStatement)?.modifiedAt.toString(); break;
    case 'modifiedBy': result = projectsArray.find((p) => p.id == searchStatement)?.modifiedBy.toString(); break;
    default: result = '';
  }
  result == undefined ? result = " ": result = result;
  return result;
}

function App() {
  ReadProjects(projects);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabTitles = ['Finanzierung', 'Aufgabenplanung'];
  const goToNextTab = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % tabTitles.length);
  };
  const goToPreviousTab = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + tabTitles.length) % tabTitles.length);
  };

  const [currentProject, setProject] = useState({
    currentProjectID: ' ',
    currentProjectName: ' ',
    currentProjectLead: ' ',
    currentProjectDescription: ' ',
    currentProjectModifiedAt: ' ',
    currentProjectModifiedBy: ' '
  });

  function handleProjectSelectUpdate(e: { target: { value: any; }; }){
    setProject(
      {
        ...currentProject, 
        currentProjectID: e.target.value,
        currentProjectName: findProjectProperty(e.target.value, 'name'),
        currentProjectLead: findProjectProperty(e.target.value, 'lead'),
        currentProjectDescription: findProjectProperty(e.target.value, 'description')
      }
    )
  }
  
  return (
    <>
    <h1>
      Valemus
    </h1>
    <div>
      <select name="Projekte" id="projects_select" 
      onChange={handleProjectSelectUpdate}>
       {projectsArray.map(project => (
        <option value={project.id}>{project.name}</option>
       ))}
      </select>
      <p id="currentprojectName">
        {currentProject.currentProjectLead}, {currentProject.currentProjectDescription}
      </p>
    </div>
    <button onClick={goToPreviousTab} disabled={activeIndex === 0}>
        vorheriger Tab
      </button>
      <button onClick={goToNextTab} disabled={activeIndex === tabTitles.length - 1}>
        nächster Tab
      </button>
      <Tabs selectedIndex={activeIndex} onSelect={index => setActiveIndex(index)}>
        <TabList>
          {tabTitles.map((title, index) => (
            <Tab key={index}>{title}</Tab>
          ))}
        </TabList>
        <TabPanel>
          test
        </TabPanel>
        <TabPanel>
          <div>Ein super toller Text, den ich ganz alleine ohne KI geschrieben habe.</div>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default App;
