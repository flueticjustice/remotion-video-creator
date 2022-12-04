import {watch} from 'fs';
// eslint-disable-next-line no-restricted-imports
import type {StaticFile} from 'remotion';
import {getFilesInPublicFolder} from './get-files-in-public-folder';
import {writeFilesDefinitionFile} from './write-files-definition-file';

let files: StaticFile[] = [];

export const initPublicFolderWatch = ({
	publicDir,
	remotionRoot,
	onUpdate,
}: {
	publicDir: string;
	remotionRoot: string;
	onUpdate: () => void;
}) => {
	fetchFolder({publicDir, remotionRoot});
	watchPublicFolder({publicDir, remotionRoot, onUpdate});
};

const fetchFolder = ({
	publicDir,
	remotionRoot,
}: {
	publicDir: string;
	remotionRoot: string;
}) => {
	files = getFilesInPublicFolder(publicDir);
	writeFilesDefinitionFile(files, remotionRoot);
};

export const watchPublicFolder = ({
	publicDir,
	remotionRoot,
	onUpdate,
}: {
	publicDir: string;
	remotionRoot: string;
	onUpdate: () => void;
}) => {
	watch(publicDir, {recursive: true}, () => {
		fetchFolder({publicDir, remotionRoot});
		onUpdate();
	});
};

export const getFiles = () => {
	return files;
};
