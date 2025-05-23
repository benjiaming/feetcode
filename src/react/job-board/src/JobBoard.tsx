import { useState, useEffect, type ReactNode } from 'react';
import './JobBoard.css';

interface Job {
  id: number;
  url: string;
  title: string;
  by: string;
  time: number; 
}

const MAX_JOBS = 6;
export default function JobBoard() {
  const [jobIds, setJobIds] = useState([]);
  const [cursor, setCursor] = useState(MAX_JOBS);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function getJobIds() {
      try {
        const result = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
        if (result.status === 200) {
          const json = await result.json();
          setJobIds(json);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getJobIds();
  }, []);

  useEffect(() => {
    if (jobIds.length === 0) return;
    updateJobs();
  }, [jobIds, cursor]);

  async function updateJob(jid: number) {
    try {
      const result = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jid}.json`);
      if (result.status === 200) {
        const json = await result.json();
        return json;
      }
    } catch (e) {
      console.error(e);
    }
    return 0;
  }

  function updateCursor() {
    if (cursor + MAX_JOBS >= jobIds.length) {
      setCursor(jobIds.length);
    } else {
      setCursor(cursor + MAX_JOBS);
    }
  }

  async function updateJobs() {
    const start = jobs.length; // Only fetch jobs not already loaded
    const end = Math.min(cursor, jobIds.length);
    const newJobs: Job[] = [];
    for (let jid = start; jid < end; jid++) {
      const job = await updateJob(jobIds[jid]);
      if (job && job.id) newJobs.push(job);
    }
    setJobs(prevJobs => [...prevJobs, ...newJobs]);
  }

  function OneJob({ job }: { job: Job }) {
    if (!job || !job.title) return null;
    return (
      <div className="job">
        <a href={job.url} target="_blank" rel="noopener noreferrer">
          <div className="jobTitle">{job.title}</div>
        </a>
        <div>
          By {job.by} &bull; {new Date(job.time * 1000).toDateString()}
        </div>
      </div>
    );
  }

  function Jobs({ jobs }: { jobs: Job[] }): ReactNode {
    return <div className='jobs'>
      {jobs.map(job => <OneJob key={job.id} job={job} />)}
    </div>
  }

  return (
    <div className='job-board'>
      <h1 className="message">Hacker News Jobs Board</h1>
      {jobs.length === 0 ? <div>Loading...</div> : <>
        <Jobs jobs={jobs} />
        <div>
          <button
            style={{ display: jobs.length >= jobIds.length ? "none" : "block" }}
            onClick={() => {
              updateCursor();
            }}
          >
            Load more
          </button>
        </div>
      </>}
    </div>
  );
}

