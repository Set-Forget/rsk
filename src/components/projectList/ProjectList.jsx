'use client';
import { API_BASE_URL, ROLES } from '@/constants/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    setIsLoading(true);
    fetch(API_BASE_URL + '?type=projectsList')
      .then((res) => res.json())
      .then((data) => {
        if (userData && userData.role === ROLES.user) {
          const filteredProjects = data.filter((project) =>
            userData.assignedProjects.includes(project[0])
          );
          setProjects(filteredProjects);
          setIsLoading(false);
        } else {
          setProjects(data);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.error('Error:', e);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center text-2xl my-10 font-medium">Project List</h2>
      <div className="flex flex-col items-center justify-center gap-10">
        {isLoading && (
          <div className="min-h-[300px] flex flex-col items-center justify-center">
            <Spinner />
            <h4 className="text-base mt-4">Loading Projects . . .</h4>
          </div>
        )}
        {projects.map((project) => (
          <Link key={project} href={`/categorize?project=${project[0]}`}>
            <button className="w-[100px] h-[40px] justify-center bg-primary rounded-md items-center inline-flex text-white text-base font-semibold">
              {project}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
