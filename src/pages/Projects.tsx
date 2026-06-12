import React from 'react';
import { motion } from 'motion/react';
import { useSeason } from '../context/SeasonContext';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export const Projects: React.FC = () => {
    const { season } = useSeason();


    return (
        <div className="mx-auto max-w-[1300px] px-[5%] py-20 transition-colors duration-700">
            <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-none mb-4 text-natural-text">
                Projects<span className="text-accent">.</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};