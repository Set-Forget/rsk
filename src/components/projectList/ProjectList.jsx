'use client';
import { API_BASE_URL } from '@/constants/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(API_BASE_URL + '?type=projectsList')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
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
