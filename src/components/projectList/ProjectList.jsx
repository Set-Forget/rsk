'use client'
import { API_BASE_URL } from '@/constants/constants';
import React, { useEffect, useState } from 'react';

const ProjectList = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
    fetch(API_BASE_URL + '?type=projectsList')
        .then(res => res.json())
        .then(data => setProjects(data))
        .catch(e => console.error('Error:', e))
    }, [])
    

  return (
    <div>
      <h2>Project Lists</h2>
      {
        projects.map(project =><button>{project}</button>)
      }
    </div>
  );
};

export default ProjectList;
