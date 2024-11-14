import {useState} from 'react';

import { DashboardContext } from '../layout/userContext';
import Dashboard from './Dashboard';

export interface User {
    admin: boolean;
    name: string;
}

interface DemoProps{}

export default function Demo( {}: DemoProps) {
    const [user] = useState<User>({
        admin: true,
        name: 'Admin'
    })
}