export interface NotificationModalProps {
    isVisible: boolean;
    onClose: () => void;
    message: string;
    type: 'success' | 'error' | 'loading';
  }