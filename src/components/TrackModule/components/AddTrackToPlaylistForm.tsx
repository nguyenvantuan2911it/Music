import { ControlOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AccountApiFp, Track } from 'src/api/api';
import s from './Modals.module.scss';
import { Input, Select } from 'antd';
import { debounce } from 'src/components/common/Function/Debounce';
import { useAppSelector } from 'src/app/hooks';
import { selectPlayList, Search } from '../../../features/playlist/PlayListSlice'
import { authorization } from 'src/features/auth/AuthSlice';
const { Option } = Select;

export interface IModalProps {
	showModal: boolean;
	valueModal: Track;
	onHideModal: any;
}

export default function AddToPlaylistForm(props: IModalProps) {
	const { valueModal, onHideModal } = props;
	const modalsRef = useRef(null);
	const [create, setCreate] = useState(false);
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState();
	const [project, setProject] = useState('');
	const [userId,setUserId] = useState('');
	const [playlistName, setPlaylistName] = useState('');
	const { Listsearch } = useAppSelector(selectPlayList)
	console.log(valueModal)
	const handleOnchange = debounce(async (e) => {
		const { value } = e.target;
		Search(value, dispatch)
		setUserId(localStorage.getItem('id'));
	}, 500)

	useEffect(() => {
		Search('', dispatch);
	}, []);

	const handleHideModal = () => {
		onHideModal(false);
	};

	const handleNewPlaylist = () => {
		setCreate(true);
	}

	function handleSelectChange(value) {
		console.log(`selected ${value}`);
		setProject(value);
	}

	function handleInputChange(e) {
		const { value } = e.target;
		setPlaylistName(value);
	}

	const handleSubmitForm = async (e) => {
		e.preventDefault();
		console.log(playlistName);
		e.preventDefault();
		if (!userId) return;
		try {
			await AccountApiFp.accountPrototypeCreatePlaylist(
				{
					id: userId,
					data: {
						name: playlistName
					},
				},
				authorization()
			)();
		} catch (error) {
			console.log('Create failted');
		}
		handleHideModal();
	};

	const handleAdd = (e) => {
		const { value } = e.target;
		console.log(value + "---" + valueModal.id);
	}
	return (
		<>
			{create ?
				<div className={s.popup_background}>
					<form onSubmit={handleSubmitForm} ref={modalsRef} >
						<div className={s.modals}>
							<div className={s.modal}>
								<div className={s.title}>Create playlist</div>
								<div style={{ display: "flex" }}>
									<input
										required
										className={s.search_input}
										placeholder="Playlist Name"
										name="name"
										onInput={handleInputChange}
									/>
								</div>
								<div style={{ display: "flex" }}>
									<Select bordered={false} defaultValue="select project" className={s.select} onChange={handleSelectChange}>
										<Option value="" >select project</Option>
										<Option value="p1">P1</Option>
										<Option value="p2">P2</Option>
									</Select>

								</div>
								<div className={s.footer}>
									<div className={s.close}>
										<button onClick={handleHideModal}>Close</button>
									</div>
									<div className={s.add}>
										<button type="submit" className={s.btn__add}>
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div> :
				<div className={s.popup_background} ref={modalsRef}>
					{/* <form onSubmit={handleSubmitForm} > */}

					<div className={s.modals}>
						<div className={s.modal}>
							<div className={s.title}>Add to playlist</div>
							<div style={{ display: "flex" }}>
								<Input
									className={s.search_input}
									suffix={<ControlOutlined style={{ fontSize: "20px" }} />}
									size="large"
									placeholder="Search"
									allowClear
									onChange={handleOnchange}
								/>
							</div>
							<div className={s.create_playlist}>
								<div className={s.create}>
									<button onClick={handleNewPlaylist}>New playlist</button>
								</div>
							</div>
							<div className={s.course}>
								{Listsearch.length > 0 && Listsearch.map((key, index) => {
									return (
										<div key={index} className={s.item}>
											<div className={s.left}>
												<button onClick={handleAdd} value={key.id} className={s.name}>{key.name}</button>
											</div>
										</div>
									)
								})}
							</div>
							<div className={s.footer}>
								<div className={s.close}>
									<button onClick={handleHideModal}>Close</button>
								</div>
								<div className={s.add}>
									<button type="submit" className={s.btn__add}>
										Save
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* </form> */}
				</div>
			}
		</>
	);
}
