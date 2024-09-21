import { IssueRequest } from "@/types/issue";

export interface UpdateIssueModalProps {
    isVisible: boolean;
    issue: IssueRequest;
    onClose: () => void;
    onUpdate: () => void;
  }