import React from 'react';
import './content-main.less';
import Url from './url';
import Request from './request';
import Response from './response';
import { Layout, Tabs} from 'antd';
const Content = Layout.Content;
const TabPane = Tabs.TabPane;

export default class ContentMain extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
            proxyOptions:{
                url: 'http://192.168.1.115/libinterview',
                method: 'post',
                headers: {
                    "content-type": "application/json",
                    "Cookie": "session_id=7ef0b6f4c5b6b90473256fe65f159c92; loginName=qzma"
                },
                body:{"SERVICE_ID":[0,5,50],"function":"system","classify":"library","input":"","offset":0,"rows":20,"page":1,"pageSize":20}
            }
        };
    }
    render() {
        const proxy = {
            proxyOptions:this.state.proxyOptions
        }
        return (
            <Content>
                <Tabs
                    onChange={this.onChange.bind(this)}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit.bind(this)}
                >
                    {this.state.panes.map(pane =>
                        <TabPane tab={pane.title} key={pane.key}>
                            <div className="header">
                                <Url {...proxy}/>
                            </div>
                            <div className="body">
                                <Request/>
                                <Response/>
                            </div>
                        </TabPane>)}
                </Tabs>
            </Content>
        )
    }
    onChange(activeKey) {
        this.setState({ activeKey });
    }
    onEdit(targetKey, action) {
        this[action](targetKey);
    }
    add() {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
}