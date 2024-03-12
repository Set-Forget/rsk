'use client';
import { API_BASE_URL } from '@/constants/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL + '?type=projectsList')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((e) => console.error('Error:', e));
  }, []);

  return (
    <div>
      <h2 className="text-center text-2xl my-10 font-medium">Project List</h2>
      <div className="flex flex-col items-center justify-center gap-10">
        {projects.map((project) => (
          <Link key={project} href={`/categorize?project=${project[0]}`}>
            <button className="w-[100px] h-[35px] justify-center bg-amber-500 rounded-md items-center inline-flex text-white text-base font-bold">
              {project}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
