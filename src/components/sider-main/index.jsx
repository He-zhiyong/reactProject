import React from "react";
import './sider-main.less';
import { Layout, Input, Tabs, Collapse, Card } from 'antd';
const { Sider } = Layout;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

export default class SiderLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiGroupData: this.apiDataHandler(this.props.apiData)
        };
    }
    apiDataHandler(data) {
        let apiData = this.sort(data,'testDate');
        var apiGroupData = []
        function hasTestDate(apiData, testDate) {
            var hasTestDate = false;
            apiData.forEach((api, index) => {
                if (api.testDate === testDate) {
                    hasTestDate = index;
                }
            });
            return hasTestDate;
        }
        apiData.forEach((api, index) => {
            let i = hasTestDate(apiGroupData, api.testDate)
            if (i === false) {
                apiGroupData.push({
                    testDate: api.testDate,
                    apiData: [api]
                });
            } else {
                apiGroupData[i].apiData.push(api)
            }
        });
        return apiGroupData
    }
    sort(data, key) {
        function by(key) {
            return function (o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[key];
                    b = p[key];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return a > b ? -1 : 1;
                    }
                    return typeof a > typeof b ? -1 : 1;
                }
            }
        }
        return data.sort(by(key));
    }
    render() {
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.siderCollapsed}
                width="280"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
                <div className="filter">
                    <Search
                        placeholder="Filter"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="History" key="1">
                        <div className="tbar">
                            <span onClick={() => alert(1)}>Clear all</span>
                            <span onClick={this.props.addApiData}>Add</span>
                        </div>
                        <Collapse bordered={false} defaultActiveKey={['1']} >
                            {this.state.apiGroupData.map((apiGroup, index) => (
                                <Panel header={apiGroup.testDate} key={index + 1}>
                                    {apiGroup.apiData.map((api, index) => (
                                        <Card key={index + 1} title={api.title} extra={<a>More</a>}>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                            <p>Card content</p>
                                        </Card>
                                    ))}
                                </Panel>
                            ))}
                        </Collapse>
                    </TabPane>
                    <TabPane tab="Collections" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            </Sider>
        )
    }
}