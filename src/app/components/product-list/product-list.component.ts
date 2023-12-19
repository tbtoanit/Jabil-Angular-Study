import { Component } from '@angular/core';
import { ProductListService } from './product-list.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [ProductListService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css', '../../common/css/bootstrap.min.css']
})
export class ProductListComponent {
  selectedImageName: any;
  onImageSelected(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      // Gán đối tượng FormData cho newProduct.image
      this.newProduct.image = selectedFile.name;
      this.selectedImageName = selectedFile.name;
    } else {
      this.newProduct.image = null;
      this.selectedImageName = '';
    }
  }
  isModalOpen = false;
  newProduct: any = {}; // Đối tượng để chứa thông tin sản phẩm mới

  openAddProductModal() {
    this.updateFlag = false;
    this.isModalOpen = true;
  }

  closeAddProductModal() {
    this.isModalOpen = false;
  }


  products: any[] = [] //properties sẽ chứa danh sách các product được trả về từ getData()

  searchOptions = {
    id: ''
  }

  constructor(private dataService: ProductListService) { }
  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (response) => {
        this.products = [];
        console.log(response)
      }
    )
    this.loadCategories();
  }

  onSubmit() {
    console.log(this.searchOptions)
    this.dataService.getProductById(this.searchOptions.id).subscribe(
      (response) => {
        this.products = []
        if (this.searchOptions.id != '') {
          this.products[0] = response;
        } else {
          this.products = response;
        }

      }
    )
  }

  //load Category lên combobox Categories
  categories: string[] = [];

  loadCategories() {
    this.dataService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  saveProduct() {
    if (this.updateFlag == true) {
      this.onUpdateProductSubmit()
      alert("Updated")
    } else {
      this.onAddProductSubmit()
      alert("Added")
    }
  }
  //save a product
  onAddProductSubmit() {
    // Gọi API POST khi nhấp vào nút "Save"
    this.dataService.addProduct(this.newProduct).subscribe(
      (data) => {
        console.log('Product added successfully:', data);
        // Đóng modal sau khi lưu thành công
        this.closeAddProductModal();
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  //load dữ liệu vào modal khi click vào table
  updateFlag: boolean = false;
  loadDataIntoModal(selectedProduct: any) {
    // Gán giá trị của hàng được chọn vào newProduct
    this.updateFlag = true;
    this.newProduct = { ...selectedProduct };
    this.selectedImageName = this.newProduct.image;
    // Hiển thị modal
    this.isModalOpen = true;
  }

  onUpdateProductSubmit() {
    // Sử dụng newProduct để gửi dữ liệu lên API Update
    this.dataService.updateProduct(this.newProduct).subscribe(
      (data) => {
        console.log('Product updated successfully:', data);
        // Đóng modal sau khi cập nhật thành công
        this.closeAddProductModal();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  //delete logic
  isDeleteConfirmationModalOpen: boolean = false;
  productToDelete: any;

  confirmDelete(product: any): void {
    console.log('Delete confirmation requested for product:', product);
    this.productToDelete = product;
    this.isDeleteConfirmationModalOpen = true;
  }

  cancelDelete(): void {
    this.productToDelete = null;
    this.isDeleteConfirmationModalOpen = false;
  }
  

  // Xác nhận xóa và gọi API DELETE
  deleteProduct(): void {
    console.log('Deleting product:', this.productToDelete);
    if (this.productToDelete) {
      const productId = this.productToDelete.id;
      this.dataService.deleteProduct(productId).subscribe(
        (data) => {
          console.log('Product deleted successfully:', data);
          this.cancelDelete();
        },
        (error) => {
          console.error('Error deleting product:', error);
          this.cancelDelete();
        }
      );
    }
  }
}
