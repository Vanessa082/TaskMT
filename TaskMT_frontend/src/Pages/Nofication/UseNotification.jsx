
import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

export default function TaskNotification({ title, deadline, time }) {
    const notifyTaskDue = () => {
        store.addNotification({
            title: 'Task Reminder',
            message: `Task '${title}' is due on ${deadline} at ${time} hours.`,
            type: 'warning', 
            container: 'bottom-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: { duration: 5000 }, 
        });
    };


    return null;
}
