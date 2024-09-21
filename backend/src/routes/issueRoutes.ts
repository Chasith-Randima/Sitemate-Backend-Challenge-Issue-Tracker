import { Router } from 'express';
import * as issueController from '../controllers/issueController';

const router = Router();

router
    .route('/')
    .get(issueController.getAllIssues)
    .post(issueController.createIssue);

router
    .route('/:id')
    .get(issueController.getIssueById)
    .patch(issueController.updateIssue)
    .delete(issueController.deleteIssue);

export default router;