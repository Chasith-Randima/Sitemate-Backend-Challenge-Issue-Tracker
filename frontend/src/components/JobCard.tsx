import {useState} from 'react';
import Image from 'next/image';
import ConfirmationModal from './models/ConfirmationModel';
import UpdateIssueModal from './models/UpdateIssueModel';
import { deleteIssue } from '@/actions/issue';
import { Issue,IssueRequest } from '@/types';
import Spinner from './common/Spinner';
import NotificationModal from './models/NotificationModel';

interface JobCardProps{
    id:string,
    issueNumber:string,
    title:string,
    description:string,
    date:string,
    fetchIssues?:()=>{}
}

const JobCard: React.FC<JobCardProps> = ({id,issueNumber,title,description,date,fetchIssues}) => {

  const [issue, setIssue] = useState<Issue[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueRequest | null>(null);

  const handleDeleteClick = (projectId: string) => {
    setSelectedIssueId(projectId);
    setShowModal(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false);
    setSelectedIssue(null);
  };

    const handleUpdateClick = (issue: IssueRequest) => {
    setSelectedIssue(issue);
    setUpdateModalVisible(true);
  };

  const handleUpdate = () => {
    setSuccess("Successfully Updated the Issue..!")
    if(fetchIssues){

      fetchIssues()
    }
    console.log('Issue updated successfully');
  };

  const confirmDelete = async () => {
    if (selectedIssueId) {
      try {
          await deleteIssue(selectedIssueId);
          setSuccess("Successfullt Deleted the Issue!")
          setIssue(previssue => ({
            ...previssue!,
            projects: previssue.filter(project => project._id !== selectedIssueId) || []
          }));
          setShowModal(false);
          if(fetchIssues){

            fetchIssues()
          }
        }catch(err:any){
          setError(err.message)
          console.log(err)
        }finally{
          setLoading(false)
        }
 
    }
  };
  return (
    <>
      {loading && (
        <div className="h-full absolute inset-0 z-50 flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      {error && <NotificationModal   isVisible={true} message={error} type='error' onClose={()=>{setError("")}}/>}
      {success && <NotificationModal   isVisible={true} message={success} type='success' onClose={()=>{setSuccess("")}}/>}
   
    <div className="border rounded-2xl p-2 bg-white max-w-md mx-auto">
      <div className={`border rounded-2xl p-4 bg-orange-100 max-w-md mx-auto`}>

      <div className="flex justify-between items-center mb-4">
        <div className="px-3 py-1 bg-white rounded-full font-bold inline-block">
          <p className="text-black">{date}</p>
        </div>

        <div className="flex justify-center items-center py-2 space-x-4">
              <button
                className="text-red-500 hover:underline flex justify-center items-center"
                onClick={() => handleDeleteClick(id)}
              >
                <Image
                  src="/trash-cn.svg"
                  alt="Delete Issue"
                  width={20}
                  height={20}
                />
              </button>
              <button
                className="text-red-500 hover:underline flex justify-center items-center"
                onClick={() => handleUpdateClick({issueNumber:id,title,description})}
              >
                <Image
                  src="/settings-update.svg"
                  alt="Update Issue"
                  width={20}
                  height={20}
                />
              </button>
              {/* <Link href={`/project/updateProject/${project._id}`} className="text-red-500 hover:underline">
                <Image
                  src="/settings-update.svg"
                  alt="Update Project"
                  width={20}
                  height={20}
                />
              </Link> */}
            
            </div>
        {/* <div className="w-6 h-6 bg-white flex justify-center items-center rounded-full">
          <img src="/path/to/bookmark-icon.svg" alt="bookmark icon" className="w-4 h-4" />
        </div> */}
      </div>
      
      {/* Job Title and Company */}
      <div className="mb-4">
        <h3 className="text-gray-900 text-sm">Issue Number : {issueNumber}</h3>
        <h2 className="text-black font-bold text-xl capitalize">{title}</h2>
      </div>
      
      {/* Job Tags */}
      {/* <div className="mb-4 flex flex-wrap gap-2">
        <span className="bg-orange-100 text-gray-700 rounded-full border-2 font-semibold border-gray-500 px-2 py-1">Part time</span>
        <span className="bg-orange-100 text-gray-700 rounded-full border-2 font-semibold border-gray-500 px-2 py-1">Senior level</span>
        <span className="bg-orange-100 text-gray-700 rounded-full border-2 font-semibold border-gray-500 px-2 py-1">Distant</span>
        <span className="bg-orange-100 text-gray-700 rounded-full border-2 font-semibold border-gray-500 px-2 py-1">Project work</span>
      </div> */}
      </div>
      
      <div className="flex justify-between items-center p-4 mx-4">
        <div>
          <span className="text-gray-700 block capitalize">{description}</span>
        </div>     
      </div>
      <ConfirmationModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this Issue ${issueNumber}?`}
      />
              <UpdateIssueModal
        isVisible={isUpdateModalVisible}
        issue={{ _id:id,issueNumber ,title, description }}
        onClose={handleUpdateModalClose}
        onUpdate={handleUpdate}
      />
    </div>
    </>
  );
}

export default JobCard;