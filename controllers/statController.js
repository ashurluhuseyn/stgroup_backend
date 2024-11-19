    const JobApply = require('../models/ApplyModel/jobApply');
    const AcademicApply = require('../models/ApplyModel/academicApply');
    const CorporateApply = require('../models/ApplyModel/corporateApply');
    const Blog = require('../models/blog');
    const User = require('../models/user');
    const Vacancy = require('../models/vacancy');
    const Course = require('../models/CourseModel/course');

    const getApplyCounts = async (req, res) => {
        try {
            const [
                jobApplyCount,
                academicApplyCount,
                corporateApplyCount,
                blogCount,
                userCount,
                vacancyCount,
                courseCount
            ] = await Promise.all([
                JobApply.count(),
                AcademicApply.count(),
                CorporateApply.count(),
                Blog.count(),
                User.count(),
                Vacancy.count(),
                Course.count()
            ]);

            res.json({
                jobApply: jobApplyCount,
                academicApply: academicApplyCount,
                corporateApply: corporateApplyCount,
                blogCount: blogCount,
                userCount: userCount,
                vacancyCount: vacancyCount,
                courseCount: courseCount
            });
        } catch (error) {
            console.error('Error fetching counts:', error);
            res.status(500).send('Server error');
        }
    };

    const getCourseViews = async (req, res) => {
        try {
        const courses = await Course.findAll();
        const courseViews = courses.map(course => ({
            name: course.title,
            views: course.viewCount
        }));
    
        res.json(courseViews);
        } catch (error) {
        console.error('Kursların baxış sayı alınarkən xəta:', error);
        res.status(500).send('Server xəta baş verdi');
        }
    };

    module.exports = {getApplyCounts, getCourseViews}