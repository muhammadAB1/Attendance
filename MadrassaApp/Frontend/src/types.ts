export type Student = {
    name: string;
	darja: string;
	attendance:  Attendance[];
    percentage: number;
};

export type Attendance = {
    attendance: string;
    dateToday: string;
};

export type singleStudent = {
    name: string;
	darja: string;
	attendance:  Attendance;
};

export type date = {
    dateToday: string;
    dayToday: string;
}