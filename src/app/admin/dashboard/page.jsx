'use client';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Image from 'next/image';
import AdminDas from '@/assets/img/admin_dash.png';
import UserImg from '@/assets/img/user.png';
import ProjectsImg from '@/assets/img/projects.png';
import RevenueImg from '@/assets/img/revenue.png';
import { Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [admin, setAdmin] = useState(null);
    const reduxAdmin = useSelector((state) => state.admin.admin);

    useEffect(() => {
        setAdmin(reduxAdmin);
    }, [reduxAdmin]);

    const revenueData = [
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540],
    ];

    const revenueOptions = {
        curveType: 'function',
        legend: { position: 'bottom' },
        width: '100%',
        height: '240px',
        colors: ['#7f94ff', '#3f5eff', '#2649ff', '#0029ff'],
    };

    const serviceData = [
        ['Task', 'Hours per Day'],
        ['Web Designing', 11],
        ['Android Development', 2],
        ['Digital Marketing', 2],
        ['UI/UX Design', 2],
    ];

    const serviceOptions = {
        width: '100%',
        height: '240px',
        colors: ['#0029ff', '#7f94ff', '#3f5eff', '#2649ff'],
    };

    const projectData = [
        ['Element', 'Density', { role: 'style' }],
        ['Active', 8.94, '#7f94ff'],
        ['Delayed', 10.49, '#3f5eff'],
        ['Completed', 19.3, '#2649ff'],
    ];

    const projectOptions = {
        title: 'Project Status',
        width: '100%',
        height: '240px',
        bar: { groupWidth: '95%' },
        legend: { position: 'none' },
    };

    const customerData = [
        ['Task', 'Hours per Day'],
        ['Web', 30],
        ['Android', 30],
        ['Digital', 30],
        ['UI/UX', 10],
    ];

    const customerOptions = {
        pieHole: 0.4,
        width: '100%',
        height: '240px',
        colors: ['#7f94ff', '#3f5eff', '#2649ff', '#0029ff'],
    };

    const trafficData = [
        ['Task', 'Hours per Day'],
        ['Organic', 30],
        ['Social', 30],
        ['Paid', 40],
    ];

    const trafficOptions = {
        pieHole: 0.4,
        width: '100%',
        height: '240px',
        colors: ['#7f94ff', '#3f5eff', '#2649ff'],
    };

    return (
        <div className="container-fluid main-container">
            {/* Ensure admin is defined before rendering */}
            {admin && (
                <Row>
                    <Col xs={12} md={6}>
                        {/* Welcome Card */}
                        <Card className="p-0 rounded-4">
                            <Card.Body className="welcome_div d-flex justify-content-between">
                                <div className="p-3">
                                    <h2>Hey {admin.username}, Welcome Back</h2>
                                    <p>Check your daily tasks & schedules</p>
                                </div>
                                <span className="admin_vector">
                                    <Image
                                        src={AdminDas}
                                        className="img-fluid admin_img"
                                        alt="admin logo"
                                        width={200}
                                        height={200}
                                    />
                                </span>
                            </Card.Body>
                        </Card>

                        {/* Data Cards */}
                        <Row className="g-3">
                            {[
                                { title: 'Total Visitors', count: '200', bgColor: 'bg-danger-subtle', icon: UserImg },
                                { title: 'Total Leads', count: '20', bgColor: 'bg-success-subtle', icon: UserImg },
                                { title: 'Active Projects', count: '10', bgColor: 'bg-warning-subtle', icon: ProjectsImg },
                                { title: 'Completed Projects', count: '105', bgColor: 'bg-info-subtle', icon: ProjectsImg },
                                { title: 'Total Revenue', count: '200K', bgColor: 'bg-danger-subtle', icon: RevenueImg },
                                { title: 'Pending Tasks', count: '10', bgColor: 'bg-warning-subtle', icon: ProjectsImg },
                                { title: 'New Users', count: '7', bgColor: 'bg-warning-subtle', icon: UserImg },
                                { title: 'Total Services', count: '5', bgColor: 'bg-success-subtle', icon: ProjectsImg },
                                { title: 'Pending Tasks', count: '10', bgColor: 'bg-warning-subtle', icon: ProjectsImg },
                            ].map((card, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={4} className="data_card">
                                    <Card>
                                        <Card.Body>
                                            <div className="d-flex flex-column">
                                                <span className={`dash_img ${card.bgColor}`}>
                                                    <Image
                                                        src={card.icon}
                                                        className="img-fluid"
                                                        alt="icon"
                                                        width={50}
                                                        height={50}
                                                    />
                                                </span>
                                                <h2 className="mt-1">{card.title}</h2>
                                                <p>{card.count}</p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Charts Section */}
                    <Col xs={12} md={6}>
                        <Card>
                            <Card.Header>
                                <h2>Revenue</h2>
                            </Card.Header>
                            <Card.Body>
                                <Chart
                                    chartType="LineChart"
                                    data={revenueData}
                                    options={revenueOptions}
                                />
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>
                                <h2>Service Popularity</h2>
                            </Card.Header>
                            <Card.Body>
                                <Chart
                                    chartType="PieChart"
                                    data={serviceData}
                                    options={serviceOptions}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Additional Charts */}
            <Row>
                {[
                    { title: 'Customer Demographics', chartId: 'customer_demo', data: customerData, options: customerOptions, type: 'PieChart' },
                    { title: 'Project Status', chartId: 'service_chart', data: projectData, options: projectOptions, type: 'ColumnChart' },
                    { title: 'Website Traffic', chartId: 'website_traffic', data: trafficData, options: trafficOptions, type: 'PieChart' },
                ].map((chart, index) => (
                    <Col key={index} xs={12} lg={4}>
                        <Card>
                            <Card.Header>
                                <h2>{chart.title}</h2>
                            </Card.Header>
                            <Card.Body>
                                <Chart
                                    chartType={chart.type}
                                    data={chart.data}
                                    options={chart.options}
                                    width="100%"
                                    height="240px"
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Dashboard;
