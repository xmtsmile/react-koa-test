import React from 'react'
import api from "../../api"
import {Button, Form, Input, message, Popconfirm, Table, Tabs} from 'antd'
import './article.scss'
import {formatDate} from '../../utils/utils'
// editor
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {convertToRaw, EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

const { TabPane } = Tabs;

class articleList extends React.Component {
    constructor(props) {
        // es6继承必须用super调用父类的constructor
        super(props);
        this.state = {
            articleData: [],
            editorContent: '',
            editorState: ''
        }
    };

    componentDidMount() {
        this.getArticleData()
    };

    getArticleData = () => {
        api.post('/article/listAll', {}).then(res => {
            if (res.data) {
                this.setState({
                    articleData: res.data
                })
            }
        });
    };

    confirm = (data) => {
        console.log('id', data);
        api.post('/article/destroy', {id: data}).then(res => {
            if (res.code === 1000) {
                message.success('delete success');
                this.getArticleData();
            }
        });
    };

    getColumns = () => {
        let columns = [
            {
                title: '标题',
                dataIndex: 'title'
            },
            {
                title: '作者',
                dataIndex: 'author'
            },
            {
                title: '概要',
                dataIndex: 'summary'
            },
            {
                title: '阅读数',
                dataIndex: 'readCount'
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: text => formatDate(text)
            },
            {
                title: '更新时间',
                dataIndex: 'updatedAt',
                render: text => formatDate(text)
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <Popconfirm
                        title="Are you sure delete this task?" onConfirm={() => this.confirm(record.id)}
                        okText="Yes" cancelText="No">
                        <Button type="primary">删除</Button>
                    </Popconfirm>
                )
            }
        ];
        return columns;
    };

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    addArticle = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
                console.log('Received values of form: ', values);
                api.post('/article/create', values).then(res => {
                    message.success('article add success!');
                    this.props.form.resetFields();
                    this.setState({
                        editorState: EditorState.createEmpty()
                    })
                });
            }
        });
    };

    tabChange = (activeKey) => {
        console.log('activeKey', activeKey)
        if (activeKey === '2') {
            this.getArticleData()
        }
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 14 }
        };
        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='article-container'>
                <Tabs type="card" onChange={this.tabChange}>
                    <TabPane tab="新 增" key="1">
                        <Form {...formItemLayout} onSubmit={this.addArticle}>
                            <Form.Item label="Title">
                                {getFieldDecorator('title', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input title',
                                        },
                                    ],
                                })(<Input placeholder="Please input title"/>)}
                            </Form.Item>
                            <Form.Item label="Author">
                                {getFieldDecorator('author', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input author',
                                        },
                                    ],
                                })(<Input placeholder="Please input author"/>)}
                            </Form.Item>
                            <Form.Item label="Summary">
                                {getFieldDecorator('summary', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input summary',
                                        },
                                    ],
                                })(<Input placeholder="Please input summary"/>)}
                            </Form.Item>
                            <Form.Item label="Content">
                                {getFieldDecorator('content', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input content',
                                        },
                                    ],
                                })(<Editor
                                    editorState={this.state.editorState}
                                    onContentStateChange={this.onEditorChange}
                                    onEditorStateChange={this.onEditorStateChange}
                                    wrapperClassName="edit-wrapper"
                                    editorClassName="edit-editor"
                                />)}
                            </Form.Item>
                            <Form.Item {...formTailLayout}>
                                <Button type="primary" htmlType="submit" size='large'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="管 理" key="2">
                        <Table rowKey={record => record.id} columns={this.getColumns()}
                               dataSource={this.state.articleData} bordered/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
const article = Form.create({ name: 'article_list' })(articleList)
export default article;
