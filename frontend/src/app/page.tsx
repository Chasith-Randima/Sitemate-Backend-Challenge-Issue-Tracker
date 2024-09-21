"use client"
import React, { useEffect, useState } from 'react';
import JobCard from '@/components/JobCard';
import { getAllIssues } from '@/actions/issue';
import { ApiResponse, Issue ,ApiResponseWithPagination} from '@/types';
import UpdateIssueModal from '@/components/models/UpdateIssueModel';
import CreateIssueModal from '@/components/models/CreateIssueModel'; 
import Image from 'next/image';
import Spinner from '@/components/common/Spinner';
import NotificationModal from '@/components/models/NotificationModel';

const Home: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const fetchIssues = async () => {
    setLoading(true)
    try {
      const response: ApiResponseWithPagination = await getAllIssues(page,limit);
      if (response.status === 'success') {
        setSuccess("Succesfull fetched issues!")
        setIssues(response.data.issues);
          let totalCount = response.data.totalIssues;
          setTotalPage(Math.ceil(totalCount / limit));
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to fetch issues');
      console.error(err);
    } finally {
      setLoading(false);
      setSuccess("")
      
    }
  };
  useEffect(() => {

    fetchIssues();
  }, [page]);

  const handleCreateModalOpen = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
  };

  const handleIssueCreate = async () => {
    setSuccess("Issue Created Succesfully")
    setLoading(true);
    try {
      const response: ApiResponseWithPagination = await getAllIssues();
      if (response.status === 'success') {
        setIssues(response.data.issues);
      }
    } catch (err) {
      console.error('Failed to fetch issues:', err);
    } finally {
      setLoading(false);
    }
  };

   const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPage) {
        nextPage = 1;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage <= 1) {
        prevPage = totalPage;
      }
      return prevPage;
    });
  };


  return (
    <>
      {loading && (
        <div className="h-full absolute inset-0 z-50 flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      {error && <NotificationModal   isVisible={true} message={error} type='error' onClose={()=>{setError("")}}/>}
      {success && <NotificationModal   isVisible={true} message={"Successfully Fetched Issues..!"} type='success' onClose={()=>{setSuccess("")}}/>}
    <div className="flex flex-col w-full px-6 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">Active Issues</h1>

        <button
          onClick={handleCreateModalOpen}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          <Image
            src="/add_new_site.svg"
            alt="Add New Issue"
            className="mr-2"
            width={24}
            height={24}
          />
          Add New Issue
        </button>
      </div>

      <div className="bg-white rounded-sm shadow-lg">
        <div className="bg-gray-100 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {issues.length > 0 ? (
              issues.map((issue) => (
                <JobCard
                  key={issue._id}
                  id={issue._id}
                  issueNumber={issue.issueNumber}
                  title={issue.title}
                  description={issue.description}
                  date={new Date(issue.createdAt).toLocaleDateString()}
                  fetchIssues={fetchIssues}
                />
              ))
            ) : (
              <p>No issues found.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center px-6 py-3">
                  <nav aria-label="page-navigation mx-auto">
                    <ul className="flex mb-4 list-style-none lg:mb-0">
                      <li className="page-item  ">
                        <a
                          href="#"
                          className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md  dark:text-gray-400  hover:bg-blue-100"
                          onClick={prevPage}
                        >
                          Previous
                        </a>
                      </li>
                      {[...Array(totalPage)].map((val, index) => {
                        return (
                          <li
                            key={index}
                            className="page-item "
                            onClick={() => setPage(index + 1)}
                          >
                            <a
                              href="#"
                              className="relative block px-3 py-1 mr-1 text-xs text-gray-100 transition-all duration-300 bg-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700"
                            >
                              {index + 1}
                            </a>
                          </li>
                        );
                      })}

                      <li className="page-item ">
                        <a
                          href="#"
                          className="relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 "
                          onClick={nextPage}
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
      </div>
      <CreateIssueModal
        isVisible={isCreateModalVisible}
        onClose={handleCreateModalClose}
        onCreate={handleIssueCreate}
      />
    </div>
    </>
  );
};

export default Home;
