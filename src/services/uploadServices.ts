import http from '@/utils/http'

const PREV_URL = '/uploads'
export const UploadKey = 'uploads'

const UploadServices = {
  uploadSingle: (path: string, file: File) => {
    console.log(file)

    const formData = new FormData()
    formData.append('path', path)
    formData.append('file', file)
    return http.post(PREV_URL + '/single', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  },

  uploadMultiple: (path: string, files: { index: number; url: string }[]) => {
    console.log(files)

    return http.post(PREV_URL + '/multiple', {
      path: path,
      files: files,
    })
  },

  deleteSingle: (path: string) => {
    return http.delete(PREV_URL + '/single', {
      data: {
        path: path,
      },
    })
  },

  deleteMultiple: (paths: string[]) => {
    return http.delete(PREV_URL + '/multiple', {
      data: {
        paths: paths,
      },
    })
  },
}

export default UploadServices
